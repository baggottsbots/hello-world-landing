// ===== TAILWIND SCRIPT INITIALIZATION =====
        function initializeTailwind() {
            tailwind.config = {
                content: [],
                theme: {
                    extend: {}
                }
            }
        }
        
        // ===== GATE STATE MANAGEMENT =====
        let currentPhone = '';
        let demoMode = false;
        
        function showGate() {
            const overlay = document.getElementById('gate-overlay');
            overlay.style.display = 'flex';
            resetGate();
        }
        
        function hideGate() {
            const overlay = document.getElementById('gate-overlay');
            const hiddenContent = document.getElementById('hidden-content');
            
            overlay.style.opacity = '0';
            
            setTimeout(() => {
                overlay.style.display = 'none';
                overlay.style.opacity = '1';
                hiddenContent.classList.remove('hidden');
                hiddenContent.classList.add('verified');
                
                // Scroll to the newly revealed content
                hiddenContent.scrollIntoView({ behavior: "smooth" });
            }, 400);
        }
        
        function resetGate() {
            document.getElementById('phone-step').classList.remove('hidden');
            document.getElementById('pin-step').classList.add('hidden');
            document.getElementById('success-state').classList.add('hidden');
            document.getElementById('pin-input').value = '';
            document.getElementById('pin-status').innerHTML = '';
            demoMode = false;
        }
        
        function requestPIN() {
            const phoneInput = document.getElementById('phone-input');
            const phoneValue = phoneInput.value.trim();
            
            if (phoneValue.length < 7) {
                phoneInput.classList.add('!border-red-400');
                setTimeout(() => {
                    phoneInput.classList.remove('!border-red-400');
                }, 1200);
                return;
            }
            
            currentPhone = phoneValue;
            demoMode = (phoneValue === '4155550192' || phoneValue === '5558675309');
            
            // Switch to PIN screen
            document.getElementById('phone-step').classList.add('hidden');
            document.getElementById('pin-step').classList.remove('hidden');
            document.getElementById('pin-input').focus();
            
            // Show demo hint
            if (demoMode) {
                document.getElementById('pin-status').innerHTML = `
                    <span class="text-amber-300">DEMO MODE: use PIN 424242</span>
                `;
            }
        }
        
        function backToPhone() {
            document.getElementById('pin-step').classList.add('hidden');
            document.getElementById('phone-step').classList.remove('hidden');
            document.getElementById('pin-status').innerHTML = '';
        }
        
        function verifyPIN() {
            const pinInput = document.getElementById('pin-input');
            const enteredPIN = pinInput.value.trim();
            const statusEl = document.getElementById('pin-status');
            
            // Demo logic
            if (demoMode && enteredPIN === '424242') {
                statusEl.innerHTML = `
                    <span class="inline-flex items-center gap-x-2">
                        <span class="relative flex h-3 w-3">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                        </span>
                        VERIFIED
                    </span>
                `;
                
                setTimeout(() => {
                    document.getElementById('pin-step').classList.add('hidden');
                    document.getElementById('success-state').classList.remove('hidden');
                }, 900);
                return;
            }
            
            // Real simulation
            if (enteredPIN.length === 6) {
                statusEl.innerHTML = `
                    <span class="inline-flex items-center gap-x-2">
                        <span class="relative flex h-3 w-3">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                        </span>
                        VERIFYING...
                    </span>
                `;
                
                setTimeout(() => {
                    statusEl.innerHTML = `
                        <span class="text-emerald-400">✓ SUCCESSFULLY VERIFIED</span>
                    `;
                    
                    setTimeout(() => {
                        document.getElementById('pin-step').classList.add('hidden');
                        document.getElementById('success-state').classList.remove('hidden');
                    }, 1100);
                }, 1250);
            } else {
                pinInput.classList.add('!border-red-400');
                statusEl.innerHTML = `<span class="text-red-400">Invalid PIN</span>`;
                
                setTimeout(() => {
                    pinInput.classList.remove('!border-red-400');
                    statusEl.innerHTML = '';
                }, 1600);
            }
        }
        
        function resendPIN() {
            const statusEl = document.getElementById('pin-status');
            statusEl.innerHTML = `<span class="text-yellow-300">PIN resent to ${currentPhone}</span>`;
            
            setTimeout(() => {
                statusEl.innerHTML = '';
            }, 2200);
        }
        
        function fakeDemoPhone() {
            const phoneInput = document.getElementById('phone-input');
            phoneInput.value = '4155550192';
            requestPIN();
        }
        
        // ===== KEYBOARD SHORTCUTS =====
        function handleKeyboard(e) {
            if (e.metaKey && e.key === "k") {
                e.preventDefault();
                const overlay = document.getElementById('gate-overlay');
                if (overlay.style.display !== 'flex') {
                    showGate();
                } else {
                    hideGate();
                }
            }
        }
        
        // ===== MOBILE MENU TOGGLE (unused but ready) =====
        function toggleMobileMenu() {
            // Reserved for future responsive nav
            console.log('%cMobile menu toggled (demo)', 'color:#facc15; font-size:10px');
        }
        
        // ===== INIT =====
        function initialize() {
            initializeTailwind();
            
            // Make sure gate is visible on load
            setTimeout(() => {
                const overlay = document.getElementById('gate-overlay');
                overlay.style.display = 'flex';
            }, 120);
            
            // Keyboard support
            document.addEventListener('keydown', handleKeyboard);
            
            // Demo: auto-fill after 4 seconds if still on gate
            setTimeout(() => {
                const overlay = document.getElementById('gate-overlay');
                if (overlay.style.display !== 'none') {
                    const phoneInput = document.getElementById('phone-input');
                    if (!phoneInput.value) {
                        // Only show hint, don't auto-complete
                        console.log('%c👋 Try the demo phone number below', 'color:#eab308;font-family:monospace');
                    }
                }
            }, 4200);
            
            // Tailwind ready message
            console.log('%c✅ PayMeGPT Hello World landing ready. SMS gate demo included.', 'color:#facc15; font-size:13px');
        }
        
        window.onload = initialize;