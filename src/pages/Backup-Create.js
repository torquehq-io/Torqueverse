import Hero from '../components/Hero'
// import './Create/styles/globals.css'



const Create  = () => {


  return (
<div>
      <Hero />
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Metaverse Marketplace</p>
        <div className="flex mt-4">
          
            {/* <a href ="/" className="mr-4 text-pink-500">
              Home
            </a> */}
          
          
            <a href ="/create-item" className="mr-6 text-pink-500">
              Sell Digital Asset
            </a>
          
          
            <a href ="/my-assets" className="mr-6 text-pink-500">
              My Digital Assets
            </a>
          
          
            <a href ="/creator-dashboard" className="mr-6 text-pink-500">
              Creator Dashboard
            </a>
          
        </div>
      </nav>
      
    </div>
  );
};

export default Create;
