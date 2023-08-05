import type { Note } from '$lib/clients/db';
import { writable, type Writable } from 'svelte/store';

// https://svelte.dev/tutorial/writable-stores
export const notes: Writable<Note[]> = writable([]);
