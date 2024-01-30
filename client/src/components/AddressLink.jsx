import PropTypes from "prop-types";

const AddressLink = ({ place }) => {
  return (
    <>
      <a
        className="flex gap-1 my-3 block font-semibold underline my-2"
        href={"https://maps.google.com/?q=" + place.address}
        rel="noreferrer"
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>

        {place.address}
      </a>
    </>
  );
};

export default AddressLink;

AddressLink.propTypes = {
  place: PropTypes.string.isRequired,
};
