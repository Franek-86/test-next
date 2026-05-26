import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type CheckboxInputType = {
  defaultValue?: boolean;
  title: string;
  name: string;
  flag: boolean;
};
const CheckboxInput = ({ title, name, flag }: CheckboxInputType) => {
  return (
    <div className='flex mt-2'>
      <Label id={name} className='mr-2'>
        {title || name}
      </Label>
      <Checkbox name={name} defaultChecked={flag} />
    </div>
  );
};

export default CheckboxInput;
