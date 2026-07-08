// js/screens/levels.js
export const LevelsScreen = () => {
    return `
        <div class="screen levels-screen">
            <header>
                <h2>Mapa Mundi</h2>
                <button onclick="navigateTo('units')">Gerenciar Unidades</button>
                <button onclick="navigateTo('achievements')">Conquistas</button>
            </header>
            
            <!-- Esta div será o container arrastável que faremos depois -->
            <div id="map-graph-container" style="width: 100%; height: 400px; background: #333;">
                <p style="color: white; padding: 20px;">Grafo de Níveis Arrastável virá aqui...</p>
                <button onclick="navigateTo('battle')">Testar Nível 1</button>
            </div>

            <button onclick="navigateTo('start')">Sair</button>
        </div>
    `;
};