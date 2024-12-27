<script lang="ts">
    import { pb } from '$lib/services/pocketbase';
    import LoginModal from '$lib/components/LoginModal.svelte';
    import { goto } from '$app/navigation';
    import Nav from '$lib/components/Nav.svelte';
    import Footer from '$lib/components/Footer.svelte';
    
    let email = '';
    let password = '';
    let error = '';
    let success = '';
    let loading = false;
    let showModal = false;

    async function handleLogin() {
        loading = true;
        error = '';
        success = '';
        
        try {
            console.log('Attempting login with:', { email });
            const authData = await pb.collection('_pb_users_auth_').authWithPassword(
                email,
                password
            );
            console.log('Login successful:', authData);
            success = 'Login successful!';
            // Redirect after successful login
            setTimeout(() => {
                goto('/');
            }, 1500);
        } catch (err) {
            console.error('Login error:', err);
            error = err instanceof Error ? err.message : 'An unknown error occurred';
        } finally {
            loading = false;
        }
    }

    function handleModalSuccess() {
        success = 'Login successful!';
        // Redirect after successful login
        setTimeout(() => {
            goto('/');
        }, 1500);
    }
</script>

<main class="layout">
    <Nav position="left" />
    <div class="content-wrapper">
        <div class="sections">
            <section class="section">
                <div class="glass-card login-container">
                    <h1 class="text-xl text-center mb-30">Login</h1>
                    
                    {#if error}
                        <div class="message error mb-20">{error}</div>
                    {/if}
                    
                    {#if success}
                        <div class="message success mb-20">{success}</div>
                    {/if}
                    
                    <form class="flex-column gap-20" on:submit|preventDefault={handleLogin}>
                        <div class="input-group">
                            <label for="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                class="input-field"
                                bind:value={email} 
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                        
                        <div class="input-group">
                            <label for="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
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

                    <div class="divider">or</div>

                    <button class="button-primary" on:click={() => showModal = true}>
                        Login with Modal
                    </button>
                </div>
            </section>
            <section class="section">
                <Footer />
            </section>
        </div>
    </div>
    <Nav position="right" />
</main>

{#if showModal}
    <LoginModal 
        on:close={() => showModal = false}
        on:success={handleModalSuccess}
    />
{/if}

<style>
.layout {
    display: flex;
    min-height: 100vh;
    width: 100%;
    position: relative;
}

.content-wrapper {
    flex: 1;
    min-width: 0;
    margin: 0 var(--nav-width);
}

.sections {
    width: 100%;
    max-width: var(--content-max-width);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    padding: 0 var(--content-padding);
}

.login-container {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.divider {
    text-align: center;
    margin: 0.5rem 0;
    position: relative;
    color: #666;
}

.divider::before,
.divider::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
}

.divider::before {
    left: 0;
}

.divider::after {
    right: 0;
}

:global(.button),
:global(.button-primary) {
    width: 100%;
    margin: 0;
}

form {
    width: 100%;
}

.input-group {
    margin: 0;
}

@media (max-width: 768px) {
    .content-wrapper {
        margin: 0;
        padding-top: 60px;
    }
}
</style>
