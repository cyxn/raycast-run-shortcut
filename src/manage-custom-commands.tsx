import * as React from "react";
import { Action, ActionPanel, Form } from "@raycast/api";

const DEEP_LINK = "raycast://extensions/cyxn/run-shorcut-for-current-application/run-custom-shortcut-for-current-application";

function composeFullUrl(): string {
    const args = {
        id: "1"
    };

    const result = encodeURIComponent(JSON.stringify(args));
    return `${DEEP_LINK}?arguments=${result}`;
}

export default function Command() {
    function CustomCreateAction() {
        return (
            <ActionPanel>
                <Action.CreateQuicklink
                    quicklink={{
                        link: composeFullUrl()
                    }}
                />
            </ActionPanel>
        );
    }

    return (
        <Form
            isLoading={false}
            actions={<CustomCreateAction />}
        >
            TBD
        </Form>
    );
}
