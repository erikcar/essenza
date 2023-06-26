import Logo from "../../assets/img/logo.png";

export function CheckEmail(){
    return (
        <div className='w100'>
                <div className='block-max-width centered'>
                <Logo className="mb-lg" style={{ verticalAlign: "top" }} />
                    <h1>
                        Controlla la tua mail per confermare la registrazione.
                    </h1>
                </div>
            </div>
    )
}