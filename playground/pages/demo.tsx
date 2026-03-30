import {
  Align,
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
      <Paragraph align="left" backgroundColor="#335" color="#fec">
        <br />
        <br />
        <br />
        Welcome to the Reacticulum demo page! This page showcases the components
        available in the Reacticulum components package.
        <br />
        <br />
        You can use these components to build your own Nomadnet pages.
        <br />
        <br />
        This is a demo of the components package. This page was last updated on{" "}
        {created}.
        <br />
        <br />
        <br />
      </Paragraph>
    </>
  );
}
