export const SettingsScreen = () => {
    return `
        <div class="screen settings-screen">
            <h2>Configurações</h2>

            <label for="sfx-volume">SFX</label>
            <input id="sfx-volume" type="range" min="0" max="100" value="100">

            <label for="music-volume">Música</label>
            <input id="music-volume" type="range" min="0" max="100" value="100">

            <label for="language-select">Linguagem</label>
            <select id="language-select">
                <option value="pt-BR">Português</option>
                <option value="en-US">English</option>
            </select>

            <button onclick="navigateTo('start')">Voltar</button>
        </div>
    `;
};
