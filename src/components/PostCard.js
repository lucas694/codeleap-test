import "./PostCard.css";
import {FiEdit} from "react-icons/fi";
import {MdDeleteForever} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {deletePost} from "../redux/actions/createPostSlice";
import { updatePost } from "../redux/actions/createPostSlice";
import {useState} from "react";
import Modal from 'react-modal';
import BtnBase from "./Buttons/BtnBase";

Modal.setAppElement('#root');

const PostCard = (props) => {
  const {postTitle, username, postContent, postId} = props;
  const [editTitle, setEditTitle] = useState(postTitle);
  const [editContent, setEditContent] = useState(postContent);

  {/*Validação isMyPost ?*/}
  const loggedInUser = useSelector(state => {
    return state.user.username
  });
  const isMyPost = loggedInUser === username;

  {/*Converter Horas*/}
  const dataHoraPostagem = new Date(`${props.hour}`);
  const dataHoraAtual = new Date();
  const diferenca = dataHoraAtual - dataHoraPostagem;
  const minutosAtras = Math.floor(diferenca / 60000);

  {/*States Modal*/}
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  function toggleDeleteModal() {
    setModalDeleteIsOpen(!modalDeleteIsOpen);
  }
  function toggleEditModal() {
    setModalEditIsOpen(!modalEditIsOpen);
  }
  {/*States Modal*/}

  {/*Dispath Deletar*/}
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deletePost(postId));
    setModalDeleteIsOpen(false);
  };

  {/*Dispath Editar*/}
  function handleUpdate() {
    dispatch(updatePost({postId, postData: {title: editTitle, content: editContent}}));
    setModalEditIsOpen(false);
  };

  return(
    <div className={"PostCardContainer"}>
      <div className={"PostCardHeader"}>
        <h1 className={"PostCardTitle"}>{postTitle}</h1>
        {isMyPost && (
        <div className={"PostCardHeaderBtnControl"}>
          <button className={"PostCardBtn"}
                  onClick={toggleDeleteModal}
          >
            <MdDeleteForever className={"PostCardDeleteIcon"}/>
          </button>
          <button className={"PostCardBtn"}
                  onClick={toggleEditModal}
          >
            <FiEdit  className={"PostCardEditIcon"}/>
          </button>
        </div>
        )}
      </div>
      <div className={"PostCardContent"}>
        <div className={"PostCardData"}>
          <h1 className={"PostCardUsername"}>{username}</h1>
          <h3 className={"PostCardHour"}>{minutosAtras} minutes ago</h3>
        </div>
        <p className={"PostCardText"}>{postContent}</p>
      </div>

      {/* Modal Delete */}
      <Modal
        isOpen={modalDeleteIsOpen}
        onRequestClose={toggleDeleteModal}
        className={"ModalStyle"}
      >
        <div className={"ModalContainer"}>
          <h1 className={"ModalDeleteTitle"}>Are you sure you want to delete this post?</h1>
          <div className={"ModalBtnControl"}>
            <BtnBase className={"BtnWhiteDefault"} children={"Cancel"} onClick={toggleDeleteModal}/>
            <BtnBase className={"BtnDelete"} children={"Delete"} onClick={handleDelete}/>
          </div>
        </div>
      </Modal>

      {/* Modal Edit */}
      <Modal
        isOpen={modalEditIsOpen}
        onRequestClose={toggleEditModal}
        className={"ModalStyle"}
      >
        <div className={"ModalContainer"}>
          <h1 className={"ModalEditTitle"}>Edit Item</h1>
          <label className={"CreatePostLabel"}>
            <span>Title</span>
            <input
              type="text"
              name="text"
              required
              placeholder={"Hello World"}
              className={"CreatePostInput-TextArea"}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </label>
          <label className={"CreatePostLabel"}>
            <span>Content</span>
            <textarea
              type="text"
              name="text"
              required
              placeholder={"Content Here..."}
              className={"CreatePostInput-TextArea"}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </label>
          <div className={"ModalBtnControl"}>
            <BtnBase className={"BtnWhiteDefault"}
                     children={"Cancel"}
                     onClick={toggleEditModal}
            />
            <BtnBase className={(!editTitle || !editContent) ? "BtnDisabled" : "BtnSave"}
                     children={"Save"}
                     onClick={handleUpdate}
                     disabled={!editTitle || !editContent}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
};export default PostCard;
