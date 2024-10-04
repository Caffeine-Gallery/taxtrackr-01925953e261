import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const addForm = document.getElementById('addTaxPayerForm');
    const searchButton = document.getElementById('searchButton');
    const taxPayerList = document.getElementById('taxPayerList');
    const searchResult = document.getElementById('searchResult');

    // Load all tax payers on page load
    await loadTaxPayers();

    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tid = document.getElementById('tid').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const address = document.getElementById('address').value;

        await backend.addTaxPayer({ tid, firstName, lastName, address });
        addForm.reset();
        await loadTaxPayers();
    });

    searchButton.addEventListener('click', async () => {
        const searchTid = document.getElementById('searchTid').value;
        const result = await backend.searchTaxPayer(searchTid);
        if (result.length > 0) {
            const taxPayer = result[0];
            searchResult.innerHTML = `
                <p>TID: ${taxPayer.tid}</p>
                <p>Name: ${taxPayer.firstName} ${taxPayer.lastName}</p>
                <p>Address: ${taxPayer.address}</p>
            `;
        } else {
            searchResult.innerHTML = '<p>No TaxPayer found with that TID.</p>';
        }
    });

    async function loadTaxPayers() {
        const taxPayers = await backend.getAllTaxPayers();
        taxPayerList.innerHTML = '';
        taxPayers.forEach(tp => {
            const li = document.createElement('li');
            li.textContent = `${tp.tid}: ${tp.firstName} ${tp.lastName}`;
            taxPayerList.appendChild(li);
        });
    }
});
