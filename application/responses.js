const JsonResponse = {
  formatUserData: (user) => {
    return {
      type: `User`,
      id: user.id,
      attributes: {
        name: user.ds_name,
        email: user.ds_email,
        bio: user.ds_bio,
        birthday: user.dt_birthday,
        avatar: user.ds_avatar,
        is_allow_to_remote: user.fl_is_allow_to_remote,
        location: {
          country: user.ds_country,
          city: user.ds_city,
          address: user.ds_address,
          latlong: user.nr_latlong,
        },
        sdg: {
          skills: user.ds_skills,
          causes: user.ds_causes,
          areas: user.ds_areas,
          sdgs: user.ds_sdgs,
        },
        meta: {
          profile: user.ds_profile,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      }
    };
  }
};

module.exports = JsonResponse;