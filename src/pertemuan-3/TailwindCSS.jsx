export default function TailwindCSS(){
    return (
        <div>
            <FlexboxGrid/>
            <h1 class="border m-4">Belajar Tailwind CSS 4</h1>
            <button className="bg-blue-500 text-white
                                px-4 py-2 mx-4 rounded
                                shadow-lg">Click Me</button>
            <Spacing/>
            <Typography/>
            <BorderRadius/>
            <BackgroundColors/>
            <ShadowEffects/>
        </div>
    )
}

function Spacing(){
    return (
        <div className="bg-gray-500 shadow-lg p-6 m-4 rounded-lg">
            <h2 className="text-lg font-semibold">Contoh Spacing</h2>
            <p className="mt-2 text-white">Ini adalah contoh penggunaan padding dan margin di Tailwind.</p>
        </div>
    )
}

function Typography(){
    return (
        <div className="ml-4 italic underline">
            <h1 className="text-4xl font-bold text-blue-900">Tailwind Typography</h1>
            <p className="text-gray-600 text-lg mt-2">Belajar Tailwind sangat menyenangkan dan cepat!</p>
        </div>
    )
}

function BorderRadius(){
    return (
        <button className="m-4 border-2 border-blue-500
        text-blue-500 px-4 py-2 rounded-r-4xl"> Klik Saya </button>
    )
}

function BackgroundColors(){
    return(
        <div className="m-4 bg-pink-300 hover:shadow-2xl transition text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Tailwind Colors</h3>
            <p className="mt-2">Belajar Tailwind itu seru dan fleksibel!</p>
        </div>
    )
}

function FlexboxGrid(){
    return (
        <nav className="flex justify-between bg-gray-800 px-8 py-4 text-white">
            <h1 className="text-lg font-bold">MyWebsite</h1>
            <ul className="flex space-x-6">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <h1 className="text-lg font-bold">Login</h1>
        </nav>
    )
}

function ShadowEffects(){
    return (
        <div className="m-4 bg-white shadow-lg p-6 rounded-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold">Hover me!</h3>
            <p className="text-gray-600 mt-2">Lihat efek bayangan saat hover.</p>
        </div>
    )
}
