import { Button } from "../../../../Components/Buttons/Button";
import { NavigationButton } from "../../../../Components/Buttons/NavigationButton";
import { SubmitButton } from "../../../../Components/Buttons/SubmitButton";
import MemberTable from "../../Components/MemberTable/MemberTable";
// import { Button, SubmitButton, NavigationButton } from './buttons';
import { FaHome, FaSave } from 'react-icons/fa';
import { RiArrowRightLine } from "react-icons/ri";

const MemberList = () => (

    <>
        <div className=" rounded-lg m-4 p-4">
            <div className="flex gap-3 justify-end mb-4">
                {/* Uncomment to use these buttons */}
                <Button variant="secondary" size="sm" className="flex items-center gap-2">
      <FaHome className="text-lg" />
      Home Page
    </Button>

    <form className="inline-block">
      <SubmitButton variant="primary" size="sm" className="flex items-center gap-2">
        <FaSave />
        Save Data
      </SubmitButton>
    </form>


                <NavigationButton
                    to="/add-member"
                    variant="primary"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    Add Member
                    <RiArrowRightLine className="text-lg" />
                </NavigationButton>
            </div>

            <div className="mt-4">
                <MemberTable />
            </div>
        </div>
    </>
);

export default MemberList;