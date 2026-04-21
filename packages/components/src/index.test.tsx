import { renderMicron } from '@reacticulum/core';
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
