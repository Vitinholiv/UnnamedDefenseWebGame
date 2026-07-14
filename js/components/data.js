//js/components/data.js
import { t } from '../i18n.js';

export const SkillsData = {
    '1': {
        'price': 25, 'power': 400, 'cooldown': 10, 'mana': 40,
        'x': 200, 'y': 200, 'moveType': 0, 'prev': 0,
        'name': { 'pt-BR': 'Bola de Fogo', 'en-US': 'Fireball' },
        'desc': { 'pt-BR': 'Invoca uma bola de fogo para queimar seus inimigos.', 'en-US': 'Summons a fireball to burn your enemies.' }
    },
    '2': {
        'price': 70, 'power': 900, 'cooldown': 25, 'mana': 75,
        'x': 400, 'y': 200, 'moveType': 0, 'prev': 1,
        'name': { 'pt-BR': 'Relâmpago', 'en-US': 'Lightning Bolt' },
        'desc': { 'pt-BR': 'Lança um relâmpago para dar dano médio a seus oponentes.', 'en-US': 'Casts a lightning bolt to deal medium damage to your opponents.' }
    },
    '3': {
        'price': 55, 'power': 200, 'cooldown': 6, 'mana': 30,
        'x': 1400, 'y': 200, 'moveType': 0, 'prev': 0,
        'name': { 'pt-BR': 'Invocar Rocha', 'en-US': 'Summon Boulder' },
        'desc': { 'pt-BR': 'Invoca uma pequena rocha para ferir as tropas inimigas.', 'en-US': 'Summons a small boulder to hurt enemy troops.' }
    },
    '4': {
        'price': 60, 'power': 5, 'cooldown': 20, 'mana': 15,
        'x': 1400, 'y': 1000, 'moveType': 1, 'prev': 0,
        'name': { 'pt-BR': 'Vento Gélido', 'en-US': 'Icy Wind' },
        'desc': { 'pt-BR': 'Emite um vento gélido que causa efeito contínuo nos inimigos.', 'en-US': 'Emits a chilling wind that causes continuous damage to enemies.' }
    },
    '5': {
        'price': 90, 'power': 700, 'cooldown': 12, 'mana': 90,
        'x': 1400, 'y': 1200, 'moveType': 0, 'prev': 4,
        'name': { 'pt-BR': 'Espinhos de Gelo', 'en-US': 'Ice Spikes' },
        'desc': { 'pt-BR': 'Dispara espinhos de gelo capazes de causar alto dano direto.', 'en-US': 'Shoots ice spikes capable of dealing high direct damage.' }
    },
    '6': {
        'price': 75, 'power': 15, 'cooldown': 30, 'mana': 35,
        'x': 1400, 'y': 800, 'moveType': 1, 'prev': 4,
        'name': { 'pt-BR': 'Envenenamento', 'en-US': 'Poisoning' },
        'desc': { 'pt-BR': 'Aplica um veneno que drena a vida do alvo por um período.', 'en-US': 'Applies a poison that drains the target\'s health over time.' }
    },
    '7': {
        'price': 100, 'power': 1000, 'cooldown': 45, 'mana': 60,
        'x': 400, 'y': 400, 'moveType': 0, 'prev': 2,
        'name': { 'pt-BR': 'Raio Lazer', 'en-US': 'Laser Beam' },
        'desc': { 'pt-BR': 'Dispara um feixe de luz concentrada para causar dano massivo.', 'en-US': 'Fires a concentrated beam of light to deal massive damage.' }
    },
    '8': {
        'price': 175, 'power': 275, 'cooldown': 20, 'mana': 55,
        'x': 1600, 'y': 1000, 'moveType': 0, 'prev': 4,
        'name': { 'pt-BR': 'Tiros de Ar', 'en-US': 'Air Shots' },
        'desc': { 'pt-BR': 'Dispara rajadas de ar comprimido para repelir e ferir inimigos.', 'en-US': 'Fires compressed air blasts to repel and wound enemies.' }
    },
    '9': {
        'price': 90, 'power': 500, 'cooldown': 30, 'mana': 30,
        'x': 200, 'y': 1000, 'moveType': 0, 'prev': 0,
        'name': { 'pt-BR': 'Sopro de Cura', 'en-US': 'Healing Breath' },
        'desc': { 'pt-BR': 'Libera uma névoa mágica que restaura a vida das unidades aliadas.', 'en-US': 'Releases a magical mist that restores health to allied units.' }
    },
    '10': {
        'price': 250, 'power': 10, 'cooldown': 65, 'mana': 60,
        'x': 1200, 'y': 1200, 'moveType': 1, 'prev': 5,
        'name': { 'pt-BR': 'Explosão Gélida', 'en-US': 'Frost Burst' },
        'desc': { 'pt-BR': 'Congela a área ao redor, causando efeito prolongado nos inimigos.', 'en-US': 'Freezes the area around, causing a prolonged effect on enemies.' }
    },
    '11': {
        'price': 240, 'power': 1200, 'cooldown': 60, 'mana': 100,
        'x': 200, 'y': 800, 'moveType': 0, 'prev': 9,
        'name': { 'pt-BR': 'Benção Angelical', 'en-US': 'Angelic Blessing' },
        'desc': { 'pt-BR': 'Invoca uma poderosa benção que cura intensamente as unidades.', 'en-US': 'Invokes a powerful blessing that intensely heals your units.' }
    },
    '12': {
        'price': 195, 'power': 400, 'cooldown': 50, 'mana': 50,
        'x': 400, 'y': 1000, 'moveType': 0, 'prev': 9,
        'name': { 'pt-BR': 'Maldição Vampírica', 'en-US': 'Vampiric Curse' },
        'desc': { 'pt-BR': 'Drena a vida dos inimigos para regenerar a sua própria.', 'en-US': 'Drains life from enemies to regenerate your own health.' }
    },
    '13': {
        'price': 65, 'power': 3000, 'cooldown': 18, 'mana': 40,
        'x': 1400, 'y': 400, 'moveType': 0, 'prev': 3,
        'name': { 'pt-BR': 'Barreira de Terra', 'en-US': 'Earth Barrier' },
        'desc': { 'pt-BR': 'Levanta um muro de terra sólida para bloquear o avanço inimigo.', 'en-US': 'Raises a solid earth wall to block the enemy advance.' }
    },
    '14': {
        'price': 85, 'power': 10, 'cooldown': 28, 'mana': 35,
        'x': 200, 'y': 1200, 'moveType': 1, 'prev': 9,
        'name': { 'pt-BR': 'Grito de Guerra', 'en-US': 'War Cry' },
        'desc': { 'pt-BR': 'Inspira aliados com um grito que melhora o desempenho por um tempo.', 'en-US': 'Inspires allies with a shout that improves performance for a time.' }
    },
    '15': {
        'price': 300, 'power': 100, 'cooldown': 35, 'mana': 80,
        'x': 1800, 'y': 1000, 'moveType': 0, 'prev': 8,
        'name': { 'pt-BR': 'Tornado', 'en-US': 'Tornado' },
        'desc': { 'pt-BR': 'Cria um vórtice de vento que atinge os inimigos repetidamente.', 'en-US': 'Creates a wind vortex that hits enemies repeatedly.' }
    },
    '16': {
        'price': 180, 'power': 8000, 'cooldown': 40, 'mana': 70,
        'x': 1600, 'y': 400, 'moveType': 0, 'prev': 13,
        'name': { 'pt-BR': 'Barreira de Ferro', 'en-US': 'Iron Barrier' },
        'desc': { 'pt-BR': 'Cria uma fortificação impenetrável de ferro para proteção máxima.', 'en-US': 'Creates an impenetrable iron fortification for maximum protection.' }
    },
    '17': {
        'price': 130, 'power': 250, 'cooldown': 55, 'mana': 90,
        'x': 600, 'y': 200, 'moveType': 0, 'prev': 2,
        'name': { 'pt-BR': 'Tempestade', 'en-US': 'Storm' },
        'desc': { 'pt-BR': 'Invoca uma tempestade que causa dano em área múltiplos hits.', 'en-US': 'Summons a storm that deals area damage with multiple hits.' }
    },
    '18': {
        'price': 400, 'power': 500, 'cooldown': 75, 'mana': 150,
        'x': 1600, 'y': 200, 'moveType': 0, 'prev': 3,
        'name': { 'pt-BR': 'Tiro de Prata', 'en-US': 'Silver Shot' },
        'desc': { 'pt-BR': 'Dispara um projétil de prata capaz de perfurar defesas inimigas.', 'en-US': 'Fires a silver projectile capable of piercing enemy defenses.' }
    },
    '19': {
        'price': 340, 'power': 2000, 'cooldown': 90, 'mana': 120,
        'x': 800, 'y': 200, 'moveType': 0, 'prev': 17,
        'name': { 'pt-BR': 'Super Trovão', 'en-US': 'Super Thunder' },
        'desc': { 'pt-BR': 'Chama uma descarga elétrica devastadora do céu.', 'en-US': 'Calls down a devastating electric discharge from the sky.' }
    },
    '20': {
        'price': 555, 'power': 1555, 'cooldown': 110, 'mana': 165,
        'x': 600, 'y': 400, 'moveType': 0, 'prev': 7,
        'name': { 'pt-BR': 'Extermínio', 'en-US': 'Extermination' },
        'desc': { 'pt-BR': 'Libera um ataque final que elimina os inimigos na área.', 'en-US': 'Releases a final attack that wipes out enemies in the area.' }
    },
    '21': {
        'price': 600, 'power': 350, 'cooldown': 120, 'mana': 200,
        'x': 1800, 'y': 1200, 'moveType': 0, 'prev': 15,
        'name': { 'pt-BR': 'Super Tornado', 'en-US': 'Super Tornado' },
        'desc': { 'pt-BR': 'Invoca um tornado colossal que varre o campo de batalha com múltiplos hits.', 'en-US': 'Invokes a colossal tornado that sweeps the battlefield with multiple hits.' }
    }
};