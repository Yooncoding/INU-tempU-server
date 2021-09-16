import UserService from "./user";
import MoodService from "./mood";

const MainService = {
  getMain: async (userId) => {
    const user = await UserService.getUser(userId);
    const mood = await MoodService.getTodayMoodAvg();

    let data = {};
    data.user = {};
    data.mood = {};

    data.user.id = user.id;
    data.user.nickname = user.nickname;
    data.user.image = user.image;
    data.user.point = user.point;
    data.user.rank = user.rank;
    data.mood.avg = mood.moodAvg;
    data.mood.count = mood.moodCount;

    return data;
  },
};

export default MainService;
