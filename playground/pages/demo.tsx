import {
  Bold,
  Color,
  Divider,
  H1,
  H2,
  H3,
  Input,
  Italic,
  Link,
  Paragraph,
  Radio,
  Underline,
} from "@reacticulum/components";

export default function IndexPage() {
  const created = new Date().toDateString();
  return (
    <>
      <H1>Header 1</H1>
      <br />
      <H2>Header 2</H2>
      <br />
      <H3>Header 3</H3>
      <br />
      <Paragraph>Paragraph,</Paragraph>
      <Bold>bold</Bold>,<br />
      <Italic>italic</Italic>,<br />
      <Underline>underline</Underline>
      <br />
      Divider:
      <br />
      <Divider symbol="*" />
      <br />
      Sample input:
      <br />
      <Input name="input" placeholder="input" />
      <br />
      Sample passsword input:
      <br />
      <Input name="password" placeholder="password" passWord />
      <br />
      <Underline>
        <Link to=":/page/index.mu">link to index</Link>
      </Underline>
      <br />
      <Paragraph>Radio buttons</Paragraph>
      <br />
      <Radio group="options" value="option1" checked label="option1" />
      <br />
      <Radio group="options" value="option2" label="option2" />
      <br />
      Color table:
      <Color hex="f00">█</Color>
      <Color hex="0f0">█</Color>
      <Color hex="00f">█</Color>
    </>
  );
}
