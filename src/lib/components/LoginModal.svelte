<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { pb } from '$lib/services/pocketbase';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    const dispatch = createEventDispatcher();
    
    // Get returnUrl from URL parameters
    $: returnUrl = $page.url.searchParams.get('returnUrl');
    
    let email = '';
    let password = '';
    let error = '';
    let loading = false;

    async function handleLogin() {
        loading = true;
        error = '';
        
        try {
            console.log('Attempting login with:', { email });
            const authData = await pb.collection('_pb_users_auth_').authWithPassword(
                email,
                password
            );
            console.log('Login successful:', authData);
            
            // If returnUrl exists, navigate to it, otherwise dispatch success event
            if (returnUrl) {
                goto(decodeURIComponent(returnUrl));
            } else {
                dispatch('success', authData);
            }
            dispatch('close');
        } catch (err) {
            console.error('Login error:', err);
            error = err instanceof Error ? err.message : 'An unknown error occurred';
        } finally {
            loading = false;
        }
    }

    function handleClose() {
        dispatch('close');
    }
</script>

<div class="modal-backdrop" on:click={handleClose}>
    <div class="glass-card modal" on:click|stopPropagation>
        <button class="close-btn" on:click={handleClose}>×</button>
        <div class="modal-header">
            <h2 class="text-xl">Login</h2>
        </div>
        
        <form class="flex-column" on:submit|preventDefault={handleLogin}>
            {#if error}
                <div class="error-message">{error}</div>
            {/if}
            
            <div class="input-group">
                <label for="modal-email">Email</label>
                <input 
                    type="email" 
                    id="modal-email" 
                    class="input-field"
                    bind:value={email} 
                    required
                    placeholder="Enter your email"
                />
            </div>
            
            <div class="input-group">
                <label for="modal-password">Password</label>
                <input 
                    type="password" 
                    id="modal-password" 
                    class="input-field"
                    bind:value={password} 
                    required
                    placeholder="Enter your password"
                />
            </div>
            
            <button type="submit" class="button" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    </div>
</div>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    width: 90%;
    max-width: 400px;
    position: relative;
}

.modal-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
    text-align: center;
}

.close-btn {
    position: absolute;
    right: 1rem;
    top: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    color: #666;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    z-index: 1;
}

.error-message {
    color: var(--error-color);
    padding: 0.75rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    background: #ffe6e6;
    border-radius: 4px;
    text-align: center;
}
</style>
