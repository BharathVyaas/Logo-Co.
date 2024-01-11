import lamaIcon from "../../assets/images/fillImage/lama.jpg";

const ChatManager = (props) => {
  console.log(props.review);
  return (
    <div className="ms-8 mt-4">
      <div className="flex flex-row justify-between pe-1 border-b-[1px] pb-1 border-white">
        <div className="flex flex-row">
          <img
            src={lamaIcon}
            alt="E"
            width="25"
            height="25"
            className="userAvatarChat"
          />

          <p className="ps-3">
            {props.review.comments.results?.user.full_name}
          </p>
        </div>

        <div>
          <p>{props.review.comments.results?.edited}</p>
        </div>
      </div>
      <p className="ps-4">{props.review.comments.results?.text}</p>
    </div>
  );
};

export default ChatManager;
