document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Fitur Interaktif: Pengalihan Tab ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('inactive');
            });
            button.classList.add('active');
            button.classList.remove('inactive');

            tabContents.forEach(content => content.classList.add('hidden'));
            
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-team-content`).classList.remove('hidden');
        });
    });

    // --- 2. Fitur Interaktif: Manipulasi DOM Roster Pemain ---
    const addPlayerBtn = document.getElementById('addPlayerBtn');
    const removePlayerBtn = document.getElementById('removePlayerBtn');
    const substituteContainer = document.getElementById('substitute-container');
    let hasSubstitute = false;

    // Fungsi menambah pemain cadangan (Pemain 5)
    addPlayerBtn.addEventListener('click', () => {
        const substituteHTML = `
            <div class="player-card" id="substitute-card" style="border-left: 3px solid var(--text-muted);">
                <h4 style="color: var(--text-muted);">Pemain 5 (Cadangan)</h4>
                <div class="input-grid">
                    <input type="text" id="p5-name" placeholder="Nama Asli" required>
                    <input type="text" id="p5-ign" placeholder="Nickname / IGN" required>
                    <input type="number" id="p5-id" placeholder="ID PUBG (Angka)" required>
                    <input type="text" id="p5-discord" placeholder="Discord (#1234)" required>
                </div>
            </div>
        `;
        substituteContainer.innerHTML = substituteHTML;
        hasSubstitute = true;
        
        // Toggle Buttons
        addPlayerBtn.classList.add('hidden');
        removePlayerBtn.classList.remove('hidden');
    });

    // Fungsi menghapus pemain cadangan
    removePlayerBtn.addEventListener('click', () => {
        substituteContainer.innerHTML = ''; // Kosongkan DOM
        hasSubstitute = false;

        // Toggle Buttons
        addPlayerBtn.classList.remove('hidden');
        removePlayerBtn.classList.add('hidden');
    });

    // --- 3. Submit Form & Tampilkan di Daftar ---
    const form = document.getElementById('registrationForm');
    const squadList = document.getElementById('squadList');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Ambil Data Tim
        const teamName = document.getElementById('teamName').value.trim();
        const captainIgn = document.getElementById('p1-ign').value.trim();
        
        // Logika jumlah pemain: 4 (Inti) atau 5 (Jika ada cadangan)
        const totalPlayers = hasSubstitute ? 5 : 4;

        // Validasi sederhana
        if (!teamName || !captainIgn) return;

        // Hapus empty state jika ada
        if (squadList.querySelector('.empty-state')) {
            squadList.innerHTML = '';
        }

        // Buat Elemen DOM Baru untuk daftar skuad
        const newSquadListItem = document.createElement('li');
        newSquadListItem.innerHTML = `
            <div>
                <strong>${teamName}</strong> 
                <span style="display:block; font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">
                    Kapten: ${captainIgn} | Total: ${totalPlayers} Pemain
                </span>
            </div>
            <span style="background: var(--accent-red); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: bold; color: white;">
                REGISTERED
            </span>
        `;
        
        squadList.appendChild(newSquadListItem);

        // Tampilkan pesan sukses
        formMessage.textContent = "Berhasil! Skuad dan Roster telah didaftarkan.";
        formMessage.className = 'message success';
        formMessage.classList.remove('hidden');

        // Reset form & kembalikan ke state 4 pemain inti saja
        form.reset();
        if (hasSubstitute) {
            removePlayerBtn.click(); // Panggil fungsi klik hapus untuk mereset UI cadangan
        }

        // Sembunyikan pesan setelah 3.5 detik
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 3500);
    });
});