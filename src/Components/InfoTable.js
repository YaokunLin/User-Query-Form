const InfoTable = ({ userInfo }) => {
  return (
    <div >
      <table className="info-list">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Query</th>
          </tr>
        </thead>
        <tbody>
          {userInfo.map(info => (
            <tr key={info.id}>
              <td>{info.firstName}</td>
              <td>{info.lastName}</td>
              <td>{info.phone}</td>
              <td>{info.email}</td>
              <td>{info.query}</td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InfoTable;