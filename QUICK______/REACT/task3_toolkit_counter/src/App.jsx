import { ControlCounter } from "./ControlCounter";
import { ControlUser } from "./ControlUser";
import { DisplayCounter } from "./DisplayCounter";
import { DisplayUser } from "./DisplayUser";

export const App = () => {
  return (
    <div className="box">
      <h3>----Counter Feature</h3>
      <DisplayCounter />
      <ControlCounter />
      <h3>---</h3>
      <DisplayUser />
      <ControlUser/>
    </div>
  );
};
