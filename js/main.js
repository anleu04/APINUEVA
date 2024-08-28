async function searchPokemon() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const results = document.getElementById('results');
    
    if (!input) {
        results.innerHTML = '<p>Por favor, ingrese el nombre de un Pokémon.</p>';
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        if (!response.ok) throw new Error('Pokémon no encontrado');
        
        const data = await response.json();
        results.innerHTML = `
            <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Tipo(s): ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            <p>Altura: ${data.height / 10} m</p>
            <p>Peso: ${data.weight / 10} kg</p>
        `;
    } catch (error) {
        results.innerHTML = `<p>${error.message}</p>`;
    }
}
