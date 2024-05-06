import { keyToAppleScriptCode } from "./constants";

export type Key = keyof typeof keyToAppleScriptCode;
export type Modifier = "command" | "control" | "shift" | "option";

export interface ShortcutToRun {
  key: Key;
  modifiers: Modifier[];
}

export interface ApplicationShortcut {
  type: "app";
  applicationName: string;
  shortcutToRun: ShortcutToRun;
}

export interface WebShortcut {
  type: "web";
  websiteUrl: string;
  shortcutToRun: ShortcutToRun;
}

export interface ApplicationShortcutRecord {
  id: number;
  name: string;
  shortcuts: (ApplicationShortcut | WebShortcut)[];
}
