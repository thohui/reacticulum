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
  const items = ["Alpha", "Beta", "Gamma"];

  return (
    <>
      <Divider symbol="═" />
      <H1>Headings</H1>
      <H1>H1 plain</H1>
      <H2>H2 plain</H2>
      <H3>H3 plain</H3>
      <H1 color="49f">H1 with color</H1>
      <H2 backgroundColor="222" color="fd5">H2 with bg + color</H2>
      <H3 align="center" bold italic>H3 centered, bold, italic</H3>
      <H1 align="right" underline>H1 right-aligned, underline</H1>

      <Divider symbol="═" backgroundColor='f66' />
      <H2>Inline Formatting</H2>
      <Paragraph><Bold>bold text</Bold></Paragraph>
      <Paragraph><Italic>italic text</Italic></Paragraph>
      <Paragraph><Underline>underline text</Underline></Paragraph>
      <Paragraph><Bold><Italic>bold + italic nested</Italic></Bold></Paragraph>
      <Paragraph><Underline><Bold>underline + bold nested</Bold></Underline></Paragraph>
      <Paragraph><Bold color="f66">bold with color prop</Bold></Paragraph>
      <Paragraph><Italic backgroundColor="333">italic with bg prop</Italic></Paragraph>

      <Divider symbol="═" />
      <H2>Color</H2>
      <Paragraph>
        <Color hex="f00">red</Color>{" "}
        <Color hex="0f0">green</Color>{" "}
        <Color hex="00f">blue</Color>
      </Paragraph>
      <Paragraph>
        <Color hex="f80">orange </Color>
        <Color hex="f80"><Bold>orange bold</Bold></Color>
      </Paragraph>
      <Paragraph>
        <Color hex="aaa">grey label: </Color>
        <Color hex="fff"><Underline>white underlined value</Underline></Color>
      </Paragraph>

      <Divider symbol="═" />
      <H2>Paragraph</H2>
      <Paragraph>plain paragraph</Paragraph>
      <Paragraph color="888">paragraph with color</Paragraph>
      <Paragraph backgroundColor="111" color="fff">paragraph with bg + color</Paragraph>
      <Paragraph align="center">paragraph centered</Paragraph>
      <Paragraph align="right">paragraph right</Paragraph>
      <Paragraph bold italic>paragraph bold + italic props</Paragraph>
      <Paragraph>
        mixed: plain <Bold>bold</Bold> <Italic>italic</Italic> <Underline>underline</Underline> end
      </Paragraph>

      <Divider symbol="═" />
      <H2>Align</H2>
      <Align align="left" /><Paragraph>after left align</Paragraph>
      <Align align="center" /><Paragraph>after center align</Paragraph>
      <Align align="right" /><Paragraph>after right align</Paragraph>

      <Divider symbol="═" />
      <H2>Divider</H2>
      <Divider symbol="─" />
      <Divider symbol="*" />
      <Divider symbol="·" />
      <Divider symbol="" />
      <Divider symbol="*" />
      <Divider symbol="═" color='f00' />
      <H2>Link</H2>
      <Paragraph><Link to=":/page/index.mu">internal link</Link></Paragraph>
      <Paragraph><Link to="https://example.com" color="49f">external link with color</Link></Paragraph>
      <Paragraph>
        <Link to=":/page/demo.mu">
          <Bold>bold link text</Bold>
        </Link>
      </Paragraph>

      <Divider symbol="═" />
      <H2>Input</H2>
      <Input name="basic" />
      <Input name="with_placeholder" placeholder="enter something" />
      <Input name="password_field" placeholder="secret" passWord />
      <Input name="wide" placeholder="wide input" width={40} />
      <Input name="narrow" placeholder="narrow" width={10} />
      <Input name="styled" placeholder="custom colors" color="fd5" backgroundColor="11a" />

      <Divider symbol="═" />
      <H2>Radio</H2>
      <Radio group="fruit" value="apple" label="Apple" checked />
      <Radio group="fruit" value="banana" label="Banana" />
      <Radio group="fruit" value="cherry" label="Cherry" />
      <Radio group="color" value="red" label="Red" checked />
      <Radio group="color" value="blue" label="Blue" align='right' italic underline color='fd5' backgroundColor="11a" />

      <Divider symbol="═" />
      <H2>Deep Nesting</H2>
      <Paragraph>
        <Color hex="888">
          outer <Bold>
            bold <Italic>
              bold+italic <Underline>bold+italic+underline</Underline>
            </Italic>
          </Bold>
        </Color>
      </Paragraph>

      <Divider symbol="═" />
      <H2>Special Characters (escaped)</H2>
      <Paragraph>backtick: `</Paragraph>
      <Paragraph>asterisk: *</Paragraph>
      <Paragraph>underscore: _</Paragraph>
      <Paragraph>backslash: \</Paragraph>
      <Paragraph>pipe: |</Paragraph>
      <Paragraph>dash: -</Paragraph>

      <Divider symbol="═" />
    </>
  );
}
