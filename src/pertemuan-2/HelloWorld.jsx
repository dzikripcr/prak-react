export default function HelloWorld(){
    const propsUserCard = {
        nama: "Goku",
        nim: "999999",
        tanggal: "2025-01-01"
    }
    return (
        <div>
            <h1>Hello World</h1>
            <p>Selamat Belajar ReactJs</p>
            <GreetingBinjai/>
            <UserCard
                nama="Dzikri"
                nim="2457301037"
                tanggal="2025/03/10"/>
            <UserCard {...propsUserCard}/>
        </div>
    )
}

function GreetingBinjai(){
    return(
        <small className="card">Salam dari Binjai 👍😁</small>
    )
}

function UserCard(props){
    return (
        <div className="card">
            <hr/>
            <h3>Nama: {props.nama}</h3>
            <p>NIM: {props.nim}</p>
            <p>Tanggal: {props.tanggal}</p>
        </div>
    )
}