import styles from "./userCard.module.scss";

export const UserCard = ({ _id, email, createdAt, isLoading, devices }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.root}>
      <div>
        <b>-Пользователь-</b>
      </div>
      <div>ID: {_id}</div>
      <div>EMAIL: {email}</div>
      <div>CREATED: {createdAt.slice(0, 16)}</div>

      {devices && (
        <div>
          DEVICES:
          {devices?.map((el, i) => (
            <span key={i}>{el}</span>
          ))}
        </div>
      )}
    </div>
  );
};
