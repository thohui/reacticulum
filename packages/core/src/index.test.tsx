import { register } from '@reacticulum/types';
import React, { PropsWithChildren } from 'react';
import { expect, test } from 'vitest';
import { renderMicron } from '.';

test('string node', () => {
	expect(renderMicron('hello')).toBe('hello');
});

test('number node', () => {
	expect(renderMicron(42)).toBe('42');
});

test('null', () => {
	expect(renderMicron(null)).toBe('');
});

test('boolean', () => {
	expect(renderMicron(true)).toBe('');
});

// native elements
test('h1', () => {
	expect(renderMicron(<h1>Hello</h1>)).toBe('#Hello\n');
});

// fragments
test('fragment', () => {
	expect(
		renderMicron(
			<>
				<h1>Title</h1>
				<h2>Subtitle</h2>
			</>,
		),
	).toBe('#Title\n##Subtitle\n');
});

// nesting
test('nested components', () => {
	const Title: React.FC<PropsWithChildren> = ({ children }) => <h1>{children}</h1>;
	register(Title, 'h1');
	expect(renderMicron(<Title>Hello</Title>)).toBe('>Hello\n');
});

// arrays
test('array of nodes', () => {
	expect(renderMicron([<h1>Title</h1>, 'some text'])).toBe('#Title\nsome text');
});

// conditional rendering
test('conditional null', () => {
	expect(
		renderMicron(
			<>
				<h1>Title</h1>
				{false && <h2>Hidden </h2>}
			</>,
		),
	).toBe('#Title\n');
});

test('conditional', () => {
	expect(
		renderMicron(
			<>
				<h1>Title</h1>
				{true && <h2>Visible </h2>}
			</>,
		),
	).toBe('#Title\n##Visible \n');
});
