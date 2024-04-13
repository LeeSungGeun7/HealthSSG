const Links = () => {
    const arrs = ["Home", "Chat" , "Portfolio", "Contact"]

    return( 
    <div className="">{
        arrs.map(e => (
            <a href={`${e}`} key={e}>{e}</a>
        ))
        }
    </div>
    )
}

export default Links ;