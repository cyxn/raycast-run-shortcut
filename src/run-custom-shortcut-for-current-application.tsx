import { closeMainWindow, getFrontmostApplication, getPreferenceValues, showHUD } from "@raycast/api";
import { supportedBrowsers } from "./constants";
import { doesMatchUrl, getActiveTabUrl, runShortcut } from "./utils";
import { idToCommandMap } from "./mock";
import { ShortcutToRun } from "./types";

export default async function main({ arguments: { id } }) {
  const frontmostApplication = await getFrontmostApplication();
  const { name: frontmostApplicationName } = frontmostApplication;
  const { browser } = getPreferenceValues();

  // todo: look in cache or in local storage by id;
  console.log({ id });
  const applicationShortcutRecord = idToCommandMap[id];
  // end todo

  let shortcutToRun: ShortcutToRun | null = null;
  let metaActiveTabUrl: string | null = null;

  if (supportedBrowsers.includes(frontmostApplicationName) || browser?.name === frontmostApplicationName) {
    const activeTabUrl = await getActiveTabUrl(frontmostApplicationName);

    if (activeTabUrl) {
      const foundShorcut = applicationShortcutRecord.shortcuts.find((shorcutObject) => {
        if (shorcutObject.type === "app") {
          return false;
        }
        const doesMatchPattern = doesMatchUrl(activeTabUrl, shorcutObject.websiteUrl);
        return doesMatchPattern;
      });
      if (foundShorcut) {
        shortcutToRun = foundShorcut.shortcutToRun;
        metaActiveTabUrl = activeTabUrl;
      }
    }
  }

  if (!shortcutToRun) {
    const foundShortcut = applicationShortcutRecord.shortcuts.find((shorcutObject) => {
      if (shorcutObject.type === "web") {
        return false;
      }
      return frontmostApplicationName === shorcutObject.applicationName;
    });
    if (foundShortcut) {
      shortcutToRun = foundShortcut.shortcutToRun;
    }
  }

  if (!shortcutToRun) {
    return await showHUD(
      `No shortcut was found for application "${frontmostApplicationName}" for command "${applicationShortcutRecord.name}"`,
    );
  }
  await closeMainWindow();
  await runShortcut({ ...shortcutToRun, appName: frontmostApplicationName });
  // todo remove hud in case of success.
  const resultText = `${applicationShortcutRecord.name} in ${metaActiveTabUrl || frontmostApplicationName}`;
  await showHUD(resultText);
}
