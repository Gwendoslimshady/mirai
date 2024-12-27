import { writable } from 'svelte/store';
import { pb } from '$lib/services/pocketbase';

// Initialize store with current auth state
const initialAuth = pb.authStore.isValid ? pb.authStore.model : null;
export const authStore = writable(initialAuth);

// Subscribe to pocketbase auth state changes
pb.authStore.onChange(() => {
    // Update store based on current auth state
    authStore.set(pb.authStore.isValid ? pb.authStore.model : null);
});
