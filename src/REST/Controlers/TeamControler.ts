import {getRepository} from "typeorm";
import {Team} from "../../Models/entity/Team";

export async function createTeam(teamReq: Team) {
    // ctx.body = ctx.request.body;
    if (await getRepository(Team).findOne({
        where: {
            id: teamReq.id
        }
    })) {
        throw 'errrrrror';
    }

    const team = new Team();
    team.users = teamReq.users;
    team.task = teamReq.task;
    team.name = teamReq.name;
    return getRepository(Team).save(team);
}
