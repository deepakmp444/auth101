import Cards from "../components/Cards";

function Home() {

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-4">
            <Cards />
          </div>
          <div className="col-sm-4">
            <Cards />
          </div>
          <div className="col-sm-4">
            <Cards />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
