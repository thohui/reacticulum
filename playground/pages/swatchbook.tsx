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

export default function Swatchbook() {
  const created = new Date().toDateString();

  let digits = [
    "f",
    "e",
    "d",
    "c",
    "b",
    "a",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "1",
    "0",
  ];

  let swatchBook = [];
  for (let r = 0; r < 16; r++) {
    for (let g = 0; g < 16; g++) {
      for (let b = 0; b < 16; b++) {
        swatchBook.push(`${digits[r]}${digits[g]}${digits[b]}`);
      }
    }
  }
	return (
		<>
		{swatchBook.map((hex) => (
			<Color hex={hex}>█</Color>
		))}
		
		</>
	  
  )
}
