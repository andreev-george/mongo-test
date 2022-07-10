import "./App.css";
import { Header } from "./components/Header";
import { useEffect } from "react";
import { UserCard } from "./components/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./redux/slices/users";
import { fetchMe } from "./redux/slices/auth";

function App() {
 

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const usersLoading = users.status === "loading";

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    dispatch(fetchMe());
  }, []);
  return (
    <div className="App">
      <Header />
      <div>
        {usersLoading ? (
          <h2>Загрузка</h2>
        ) : (
          users.list.map((user, index) =>
            usersLoading ? (
              <UserCard isLoading={true} key={index} />
            ) : (
              <UserCard
                key={index}
                _id={user._id}
                email={user.email}
                createdAt={user.createdAt}
                devices = {user.devices}
              />
            )
          )
        )}
      </div>
      <header className="App-header"></header>
    </div>
  );
}

export default App;
