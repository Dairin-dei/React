import { useEffect, useState } from "react";
import "./form.css";

import { IBookUser } from "../tools/interfaces";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUserBooks } from "../../features/userBooks/userBooksSlice";

interface IFormData {
  inputAuthor: string;
  inputTitle: string;
  inputPublishDate: string;
  inputPublisher: string;
  inputCover: FileList;
  inputRead: string;
  inputLike: false;
}

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    setValue,
  } = useForm<IFormData>();

  const dispatch = useDispatch();

  const [uploaded, setUploaded] = useState(false);
  const [newBook, setNewBook] = useState(true);

  function onSubmit(data: IFormData) {
    const newBook: IBookUser = {
      id: String(Math.random()),
      author: data.inputAuthor,
      title: data.inputTitle,
      publishDate: data.inputPublishDate.slice(0, 4),
      description: "",
      publisher: data.inputPublisher,
      cover:
        data.inputCover === null
          ? new Blob(["<html>…</html>"], { type: "text/html" })
          : data.inputCover[0],
      read: Number(data.inputRead),
      like: data.inputLike,
    };

    setUploaded(false);
    setNewBook(true);
    dispatch(setUserBooks(newBook));
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        inputTitle: "",
        inputAuthor: "",
        inputLike: false,
        inputPublishDate: "",
      });
      setValue("inputPublisher", "Римис");
      setUploaded(false);
    }
  }, [isSubmitSuccessful, reset, setValue]);

  function handleOnBookCoverChange() {
    setUploaded(true);
  }

  function handleOnChange() {
    setNewBook(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor="bookName">
          Название:
          {errors.inputTitle && (
            <span className="error1">{errors.inputTitle.message}</span>
          )}
          <input
            {...register("inputTitle", { required: "Введите название книги!" })}
            className="input"
            type="text"
            data-testid="form-book-name"
            onChange={handleOnChange}
          />
        </label>
        <label htmlFor="bookAuthor">
          Автор:
          {errors.inputAuthor && (
            <span className="error2">{errors.inputAuthor.message}</span>
          )}
          <input
            {...register("inputAuthor", { required: "Введите имя автора!" })}
            className="input"
            type="text"
            data-testid="form-book-author"
            onChange={handleOnChange}
          />
        </label>
        <label htmlFor="bookDate">
          Дата выхода
          {errors.inputPublishDate && (
            <span className="error3">{errors.inputPublishDate.message}</span>
          )}
          <input
            {...register("inputPublishDate", {
              required: "Введите дату выхода!",
            })}
            className="input form__book-date"
            type="date"
            data-testid="form-book-data"
            onChange={handleOnChange}
          />
        </label>
        <label htmlFor="bookPublisher">
          Издательство
          <select
            {...register("inputPublisher")}
            className="input input-publisher"
            name="publisher"
          >
            <option>Римис</option>
            <option>Эксмо</option>
            <option>Мектеп</option>
            <option>АСТ</option>
            <option>Алгоритм</option>
            <option>Вакоша</option>
            <option>Азбука</option>
            <option>Мартин</option>
          </select>
        </label>
        <div className="wrapper horizontal">
          <label className="form__book-read-label">
            <label className="radio">
              <input
                {...register("inputRead")}
                type="radio"
                value={0}
                checked={newBook}
                onChange={handleOnChange}
              />
              <div className="radio__text"> Не прочитано</div>
            </label>
            <label className="radio">
              <input
                {...register("inputRead")}
                type="radio"
                value={1}
                data-testid="form-book-read"
                onChange={handleOnChange}
              />
              <div className="radio__text"> Прочитано</div>
            </label>
            <label className="radio">
              <input
                {...register("inputRead")}
                type="radio"
                value={2}
                id=""
                onChange={handleOnChange}
              />
              <div className="radio__text"> Буду перечитывать</div>
            </label>
          </label>
          <div className="wrapper vertical">
            <label
              className={`input-file-label ${uploaded ? "uploaded" : "no"}`}
            >
              <span className="title">Выбрать обложку</span>
              <input
                {...register("inputCover")}
                className="input-file"
                type="file"
                onChange={() => {
                  handleOnBookCoverChange();
                  handleOnChange();
                }}
              />
            </label>
            <label className="form__book-like-label">
              <input
                {...register("inputLike")}
                className="input"
                type="checkbox"
                onChange={handleOnChange}
              />
              <div className="form__book-like-checkmark"></div>
              <div className="form__book-like-text">Понравилась!</div>
            </label>
          </div>
        </div>
        <div className="button">
          <input
            type="submit"
            value="send"
            className="form__book-submit"
            disabled={newBook}
          />
        </div>
      </form>
    </>
  );
}

export default Form;
