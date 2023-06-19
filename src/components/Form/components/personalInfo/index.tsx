import styles from "./index.module.scss";
import Input from "./components/input";
import FormHeader from "../formHeader";
import BottomNavigation from "../bottomNavigation";

function PersonalInfo() {
  return (
    <div data-testid="personal-info" className={styles.container}>
      <div>
        <FormHeader
          title="Personal info"
          subtitle="Please provide your name, email address and phone number."
        />
        <Input
          label="Name"
          placeholder="e.g Stephen"
          type="text"
          name="name"
          pattern={/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s']+$/}
          errorMessage="Invalid name. Only letters, spaces, and apostrophes are allowed."
        />
        <Input
          label="Surname"
          placeholder="e.g Jackson"
          type="text"
          name="surname"
          pattern={/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s']+$/}
          errorMessage="Invalid surname. Only letters, spaces, and apostrophes are allowed."
        />
        <Input
          label="Email Address"
          placeholder="e.g stephenking@lorem.com"
          type="email"
          name="email"
          pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
          errorMessage="Invalid email format. Please enter a valid email address."
        />
      </div>
      <BottomNavigation />
    </div>
  );
}

export default PersonalInfo;
