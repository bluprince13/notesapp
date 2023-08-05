import type { Note } from '$lib/clients/db';
import { writable, type Writable } from 'svelte/store';

export const notes: Writable<Note[]> = writable([]);
