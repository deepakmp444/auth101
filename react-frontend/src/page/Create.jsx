function Create() {
  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-4 offset-sm-4">
            <h1 className="text-center">Create Account</h1>
            <form>
              <input
                className="form-control mt-2"
                placeholder="Enter email"
                type="email"
              />
              <input
                className="form-control mt-2"
                placeholder="Enter password"
                type="password"
              />
              <button type="submit" className="btn btn-success mt-2">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
