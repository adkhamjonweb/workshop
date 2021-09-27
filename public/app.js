const toCurresy = (price) => {
    return new Intl.NumberFormat('en-EN', {
        currency: 'usd',
        style: 'currency'
    }).format(price)
}

document.querySelectorAll('.price').forEach(elem => {
    elem.textContent = toCurresy(elem.textContent)
})

const $card = document.querySelector('#card');

if ($card) {
    $card.addEventListener('click', event => {
        // console.log(event.target.classList.contains('js-remove'));
        if (event.target.classList.contains('js-remove')) {
            // console.log(event.target.dataset);
            const id = event.target.dataset.id
            fetch('/card/remove/' + id, {
                    method: 'delete'
                }).then(data => data.json())
                .then(data => {
                    if (data.cars.length) {
                        const card = data.cars.map(c => {
                            return `
                        <tr>
                        <th>${c.model}</th>
                        <th>${c.count}</th>
                        <th>
                          <button
                            type="submit"
                            class="btn btn-small js-remove"
                            data-id="${c.id}"
                          >Delete</button>
                        </th>
                      </tr>
                        `
                        }).join('')
                        $card.querySelector('tbody').innerHTML = card
                        $card.querySelector('.price').textContent = toCurresy(data.price)
                    } else {
                        $card.innerHTML = "<p>Card is empty</p>"
                    }
                })
        }
    })
}