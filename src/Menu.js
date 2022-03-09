import React from 'react'

const Menu = ({ items }) => {
    return (
        <div className="section-center">
            {items.map((menuItem) => {
                const { id, title, price, desc } = menuItem
                return (
                    <article key={id} className="menu-item">
                        <div className="item-info">
                            <header>
                                <h4>{title}</h4>
                                <h4 className="price">N{price}</h4>
                            </header>
                            <p className="item-text">{desc}</p>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}

export default Menu