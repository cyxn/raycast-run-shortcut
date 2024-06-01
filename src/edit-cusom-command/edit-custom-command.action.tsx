import { Action, Icon } from "@raycast/api";
import { CustomCommandView } from "../components/custom-command-view";

interface IProps {
  id: string;
}

export const EditCustomCommandAction = ({ id }: IProps) => {
  return <Action.Push title="Edit Command" target={<CustomCommandView isEdit id={id} />} icon={Icon.Pencil} />;
};
