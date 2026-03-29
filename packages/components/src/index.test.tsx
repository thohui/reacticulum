import { serialize } from '@reacticulum/core';
import React from 'react';
import { expect, test } from 'vitest';
import { Bold, Color, Divider, H1, Input, Link, Radio } from '.';

test('H1', () => {
	expect(serialize(<H1>Hello</H1>)).toBe('#Hello\n');
});

test('Bold', () => {
	expect(serialize(<Bold>bold</Bold>)).toBe('`!bold`!');
});

test('Link', () => {
	expect(serialize(<Link to="about">About</Link>)).toBe('>[About:about]');
});

test('Input', () => {
	expect(serialize(<Input name="name" placeholder="Your name" />)).toBe('<name|Your name>');
});

test('Divider', () => {
	expect(serialize(<Divider symbol='' />)).toBe('---\n');
});

test('Color', () => {
	expect(serialize(<Color hex="f00">Red</Color>)).toBe('`Ff00Red`f');
});

test('Radio', () => {
	expect(serialize(<Radio group="options" value="option1" label="label1" checked />)).toBe('`<^options|option1|*>`label1`');
});

test('composition', () => {
	expect(serialize(
		<>
			<H1>My Node</H1>
			<Bold>Welcome</Bold>
			<Divider symbol="*" />
			<Link to="about">About</Link>
		</>
	)).toBe('>My Node\n`!Welcome`!---\n>[About:about]');
});
