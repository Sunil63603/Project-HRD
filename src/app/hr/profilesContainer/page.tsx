import ProfilesClientComp from "./(profileContainerClientComp)/profileContainerClientComp";
//when HR clicks on any one profile from this list of profiles , 'individualProfile' will be displayed.

const Profiles = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <ProfilesClientComp></ProfilesClientComp>
    </div>
  );
};

export default Profiles;
