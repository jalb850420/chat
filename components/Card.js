import React from "react";

export const Card = ({usuario,clickHandler, className = ""})=>{

    return(
        <article className="w-60 h-40 bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-300 p-4 text-black" 
        onClick={clickHandler}>
            <h2 className="p-2">{usuario.name.first}</h2>
            <div className="flex">
                <div className="relative w-32 h-32 group">
                    <img
                        src={usuario.picture.medium}
                        alt="User small"
                        className="rounded-full w-16 h-16 object-cover group-hover:opacity-0 transition duration-300"
                    />
                    <img
                        src={usuario.picture.large}
                        alt="User large"
                        className="absolute top-0 left-0 rounded-full w-32 h-32 object-cover opacity-0 group-hover:opacity-100 transition duration-300"
                    />
                </div>
                <section>
                    <h1>{usuario.location.country}</h1>
                    <h2>{usuario.location.city}</h2>
                </section>
            </div>
        </article>
    )
}  