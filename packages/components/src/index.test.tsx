import { renderHTML, renderMicron } from '@reacticulum/core';
import React from 'react';
import { expect, test } from 'vitest';
import { Align, Bold, Checkbox, Color, Divider, H1, H2, H3, Input, Italic, Link, Paragraph, Radio, Underline } from '.';

test('H1', () => {
	expect(renderMicron(<H1>Hello</H1>)).toBe('>Hello\n');
});

test('H2', () => {
	expect(renderMicron(<H2>Hello</H2>)).toBe('>>Hello\n');
});

test('H3', () => {
	expect(renderMicron(<H3>Hello</H3>)).toBe('>>>Hello\n');
});

test('Bold', () => {
	expect(renderMicron(<Bold>bold</Bold>)).toBe('`!bold`!');
});

test('Italic', () => {
	expect(renderMicron(<Italic>italic</Italic>)).toBe('`*italic`*');
});

test('Underline', () => {
	expect(renderMicron(<Underline>underline</Underline>)).toBe('`_underline`_');
});

test('Color', () => {
	expect(renderMicron(<Color hex='f00'>Red</Color>)).toBe('`Ff00Red`f');
});

test('Link', () => {
	expect(renderMicron(<Link to='about'>About</Link>)).toBe('`[About`about]`');
});

test('Paragraph', () => {
	expect(renderMicron(<Paragraph>hello</Paragraph>)).toBe('hello\n');
});

test('Align', () => {
	expect(renderMicron(<Align align='center' />)).toBe('`c');
});

test('Divider', () => {
	expect(renderMicron(<Divider symbol='*' />)).toBe('\n-*\n');
});

test('Input', () => {
	expect(renderMicron(<Input name='name' placeholder='Your name' />)).toBe('`<24|name`Your name>');
});

test('Radio', () => {
	expect(renderMicron(<Radio group='options' value='option1' label='label1' checked />)).toBe('`<^|options|option1|*`>label1');
});

test('Checkbox', () => {
	expect(renderMicron(<Checkbox fieldName='agree' value='yes' label='Accept terms' />)).toBe('`<?|agree|yes`>Accept terms');
});

test('Checkbox checked', () => {
	expect(renderMicron(<Checkbox fieldName='agree' value='yes' label='Accept terms' checked />)).toBe('`<?|agree|yes|*`>Accept terms');
});

test('Checkbox with color', () => {
	expect(renderMicron(<Checkbox fieldName='agree' value='yes' label='Accept terms' color='0f0' />)).toBe('`F0f0`<?|agree|yes`>Accept terms `f');
});

test('H1 with color', () => {
	expect(renderMicron(<H1 color='f00'>Red heading</H1>)).toBe('>`Ff00Red heading `f\n');
});

test('composition', () => {
	expect(
		renderMicron(
			<>
				<H1>My Node</H1>
				<Bold>Welcome</Bold>
				<Divider symbol='*' />
				<Link to='about'>About</Link>
			</>,
		),
	).toBe('>My Node\n`!Welcome`!\n-*\n`[About`about]`');
});

// renderHTML

test('html H1', () => {
	expect(renderHTML(<H1>Hello</H1>)).toBe('<h1>Hello</h1>');
});

test('html H2', () => {
	expect(renderHTML(<H2>Hello</H2>)).toBe('<h2>Hello</h2>');
});

test('html H3', () => {
	expect(renderHTML(<H3>Hello</H3>)).toBe('<h3>Hello</h3>');
});

test('html Bold', () => {
	expect(renderHTML(<Bold>bold</Bold>)).toBe('<strong>bold</strong>');
});

test('html Italic', () => {
	expect(renderHTML(<Italic>italic</Italic>)).toBe('<em>italic</em>');
});

test('html Underline', () => {
	expect(renderHTML(<Underline>underline</Underline>)).toBe('<u>underline</u>');
});

test('html Color', () => {
	expect(renderHTML(<Color hex='f00'>Red</Color>)).toBe('<span style="color:#f00">Red</span>');
});

test('html Link', () => {
	expect(renderHTML(<Link to='about'>About</Link>)).toBe('<a href="about">About</a>');
});

test('html Paragraph', () => {
	expect(renderHTML(<Paragraph>hello</Paragraph>)).toBe('<p>hello</p>');
});

test('html Align', () => {
	expect(renderHTML(<Align align='center' />)).toBe('<div style="display:flex;justify-content:center"></div>');
});

test('html Divider', () => {
	expect(renderHTML(<Divider symbol='*' />)).toBe('<hr />');
});

test('html Input', () => {
	expect(renderHTML(<Input name='name' placeholder='Your name' />)).toBe('<input type="text" name="name" placeholder="Your name" size="24" />');
});

test('html Radio', () => {
	expect(renderHTML(<Radio group='options' value='option1' label='label1' checked />)).toBe(
		'<label><input type="radio" name="options" value="option1" checked />label1</label>',
	);
});

test('html Checkbox', () => {
	expect(renderHTML(<Checkbox fieldName='agree' value='yes' label='Accept terms' />)).toBe(
		'<label><input type="checkbox" name="agree" value="yes" />Accept terms</label>',
	);
});

test('html Checkbox checked', () => {
	expect(renderHTML(<Checkbox fieldName='agree' value='yes' label='Accept terms' checked />)).toBe(
		'<label><input type="checkbox" name="agree" value="yes" checked />Accept terms</label>',
	);
});

test('html Checkbox with color', () => {
	expect(renderHTML(<Checkbox fieldName='agree' value='yes' label='Accept terms' color='0f0' />)).toBe(
		'<label><input type="checkbox" name="agree" value="yes" />Accept terms</label>',
	);
});

test('html H1 with color', () => {
	expect(renderHTML(<H1 color='f00'>Red heading</H1>)).toBe('<h1 style="color:f00">Red heading</h1>');
});

test('html xss', () => {
	expect(renderHTML(<Link to='"><script>alert(1)</script>'>click</Link>)).toBe('<a href="&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;">click</a>');
});

test('html composition', () => {
	expect(
		renderHTML(
			<>
				<H1>My Node</H1>
				<Bold>Welcome</Bold>
				<Divider symbol='*' />
				<Link to='about'>About</Link>
			</>,
		),
	).toBe('<h1>My Node</h1><strong>Welcome</strong><hr /><a href="about">About</a>');
});
