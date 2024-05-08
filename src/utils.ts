import { runAppleScript } from "@raycast/utils";
import { keyToAppleScriptCode, supportedBrowsers } from "./constants";
import { ApplicationShortcut, ShortcutToRun, WebShortcut } from "./types";

type RunShortcutParams = {
  appName: string;
  key: ShortcutToRun["key"];
  modifiers: ShortcutToRun["modifiers"];
};

export const runShortcut = async ({ key, appName, modifiers }: RunShortcutParams): Promise<null> => {
  const appleScriptKeyCode = keyToAppleScriptCode[key];
  const modifierString = modifiers.map((modifier) => `${modifier} down`).join(", ");

  await runAppleScript(`
        tell application "${appName}" to activate
        tell application "System Events"
            key code ${appleScriptKeyCode} ${modifierString ? `using {${modifierString}}` : ""}
        end tell
    `);
  return null;
};

export async function getActiveTabUrl(browser: string): Promise<URL | null> {
  const script =
    browser === "Safari"
      ? `
        tell application "Safari"
            if it is running then
                get URL of front document
            end if
        end tell
    `
      : `
        tell application "${browser}"
            if it is running then
                get URL of active tab of front window
            end if
        end tell
    `;
  try {
    const url = await runAppleScript(script);

    if (!url) {
      return null;
    }

    return new URL(url);
  } catch (error) {
    return null;
  }
}

export function doesMatchUrl(testUrl: URL, websiteUrl: string): boolean {
  return testUrl.href.includes(websiteUrl);
}

export function isCurrentAppBrowser({
  frontmostApplicationName,
  preferenceBrowserName,
}: {
  frontmostApplicationName: string;
  preferenceBrowserName: string;
}) {
  return supportedBrowsers.includes(frontmostApplicationName) || preferenceBrowserName === frontmostApplicationName;
}

export function compareIsAppMatches({
  shortcut,
  activeTabUrl,
  frontmostApplicationName,
}: {
  shortcut: ApplicationShortcut | WebShortcut;
  activeTabUrl: URL | null;
  frontmostApplicationName: string;
}): boolean {
  if (shortcut.type === "web" && activeTabUrl) {
    const doesMatchPattern = doesMatchUrl(activeTabUrl, shortcut.websiteUrl);
    return doesMatchPattern;
  }
  if (shortcut.type === "app") {
    return frontmostApplicationName === shortcut.applicationName;
  }
  return false;
}
