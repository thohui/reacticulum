import { Checkbox } from "@reacticulum/components";

export default function DemoPage() {
  return (
    <>
      <Checkbox fieldName="agree" value="yes" label="Accept terms" />
      <Checkbox fieldName="agree" value="yes" checked label="Accept terms (checked)" color="0f0" />
      <Checkbox fieldName="agree" value="yes" label="Accept terms (bg)" backgroundColor="a00" color="fff" />
    </>
  );
}
