import { ApplicationShortcutRecord } from "./types";

export const applicationShortcutRecordToggleMute: ApplicationShortcutRecord = {
  id: 1,
  name: "Toggle Mute/Unmute",
  shortcuts: [
    {
      type: "web",
      shortcutToRun: {
        key: "d",
        modifiers: ["command"],
      },
      websiteUrl: "https://meet.google.com/",
    },
    {
      type: "app",
      applicationName: "Slack",
      shortcutToRun: {
        key: " ",
        modifiers: ["command", "shift"],
      },
    },
    {
      type: "app",
      applicationName: "zoom.us",
      // this one is default
      //            shortcutToRun: {
      //                key: "a",
      //                modifiers: ["command", "shift"]
      //            }
      shortcutToRun: {
        key: "d",
        modifiers: ["command"],
      },
    },
  ],
};

export const applicationShortcutRaiseHandForMeet: ApplicationShortcutRecord = {
  id: 2,
  name: "Toggle Raise Hand",
  shortcuts: [
    {
      type: "web",
      shortcutToRun: {
        key: "h",
        modifiers: ["command", "control"],
      },
      websiteUrl: "https://meet.google.com/",
    },
    {
      type: "app",
      applicationName: "zoom.us",
      shortcutToRun: {
        key: "y",
        modifiers: ["option"],
      },
    },
  ],
};

export const idToCommandMap: Record<ApplicationShortcutRecord["id"], ApplicationShortcutRecord> = {
  1: applicationShortcutRecordToggleMute,
  2: applicationShortcutRaiseHandForMeet,
};
