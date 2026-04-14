import { serialize } from '@reacticulum/core';
import React from 'react';
import { expect, test } from 'vitest';
import { Align, Bold, Checkbox, Color, Divider, H1, H2, H3, Input, Italic, Link, Paragraph, Radio, Underline } from '.';

test('H1', () => {
	expect(serialize(<H1>Hello</H1>)).toBe('>Hello\n');
});

test('H2', () => {
	expect(serialize(<H2>Hello</H2>)).toBe('>>Hello\n');
});

test('H3', () => {
	expect(serialize(<H3>Hello</H3>)).toBe('>>>Hello\n');
});

test('Bold', () => {
	expect(serialize(<Bold>bold</Bold>)).toBe('`!bold`!');
});

test('Italic', () => {
	expect(serialize(<Italic>italic</Italic>)).toBe('`*italic`*');
});

test('Underline', () => {
	expect(serialize(<Underline>underline</Underline>)).toBe('`_underline`_');
});

test('Color', () => {
	expect(serialize(<Color hex='f00'>Red</Color>)).toBe('`Ff00Red`f');
});

test('Link', () => {
	expect(serialize(<Link to='about'>About</Link>)).toBe('`[About`about]`');
});

test('Paragraph', () => {
	expect(serialize(<Paragraph>hello</Paragraph>)).toBe('hello\n');
});

test('Align', () => {
	expect(serialize(<Align align='center' />)).toBe('`c');
});

test('Divider', () => {
	expect(serialize(<Divider symbol='*' />)).toBe('\n-*\n');
});

test('Input', () => {
	expect(serialize(<Input name='name' placeholder='Your name' />)).toBe('`<24|name`Your name>');
});

test('Radio', () => {
	expect(serialize(<Radio group='options' value='option1' label='label1' checked />)).toBe('`<^|options|option1|*`>label1');
});

test('Checkbox', () => {
	expect(serialize(<Checkbox fieldName='agree' value='yes' label='Accept terms' />)).toBe('`<?|agree|yes`>Accept terms');
});

test('Checkbox checked', () => {
	expect(serialize(<Checkbox fieldName='agree' value='yes' label='Accept terms' checked />)).toBe('`<?|agree|yes|*`>Accept terms');
});

test('Checkbox with color', () => {
	expect(serialize(<Checkbox fieldName='agree' value='yes' label='Accept terms' color='0f0' />)).toBe('`F0f0`<?|agree|yes`>Accept terms `f');
});

test('H1 with color', () => {
	expect(serialize(<H1 color='f00'>Red heading</H1>)).toBe('>`Ff00Red heading `f\n');
});

test('composition', () => {
	expect(
		serialize(
			<>
				<H1>My Node</H1>
				<Bold>Welcome</Bold>
				<Divider symbol='*' />
				<Link to='about'>About</Link>
			</>,
		),
	).toBe('>My Node\n`!Welcome`!\n-*\n`[About`about]`');
});
