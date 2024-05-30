interface ButtonInfo {
  l: string; // Label
  d: string; // Description
}

export interface BmType {
  AV: Record<string, ButtonInfo>;
  AC: Record<string, ButtonInfo>;
  PR: Record<string, ButtonInfo>;
  UI: Record<string, ButtonInfo>;
  S: Record<string, ButtonInfo>;
  C: Record<string, ButtonInfo>;
  I: Record<string, ButtonInfo>;
  A: Record<string, ButtonInfo>;
}

interface BgType {
  AV: string;
  AC: string;
  PR: string;
  UI: string;
  S: string;
  C: string;
  I: string;
  A: string;
}

interface SeverityRatingType {
    name: string,
    bottom: number,
    top: number
}


export const bg:BgType = {
  AV: "Attack Vector",
  AC: "Attack Complexity",
  PR: "Privileges Required",
  UI: "User Interaction",
  S: "Scope",
  C: "Confidentiality",
  I: "Integrity",
  A: "Availability",
};

export const bm:BmType= {
  AV: {
    N: {
      l: "Network",
      d: "<b>Worst:</b> A vulnerability exploitable with network access means the vulnerable authorization scope is bound to the network stack and the attacker's path to the vulnerable system is at the network layer. Such a vulnerability is often termed 'remotely exploitable'.",
    },
    A: {
      l: "Adjacent",
      d: "<b>Worse:</b> A vulnerability exploitable with adjacent network access means the vulnerable authorization scope is bound to the network stack and the attacker's path to the vulnerable system is at the data link layer. Examples include local IP subnet, Bluetooth, IEEE 802.11, and local Ethernet segment.",
    },
    L: {
      l: "Local",
      d: "<b>Bad:</b> A vulnerability exploitable with local access means the vulnerable authorization scope is not bound to the network stack and the attacker's path to the vulnerable authorization scope is via read / write / execute capabilities. If the attacker has the necessary Privileges Required to interact with the vulnerable authorization scope, they may be logged in locally; otherwise, they may deliver an exploit to a user and rely on User Interaction",
    },
    P: {
      l: "Physical",
      d: "<b>Bad:</b> A vulnerability exploitable with physical access requires the ability to physically touch or manipulate a vulnerable authorization scope. Physical interaction may be brief (evil maid attack) or persistent.",
    },
  },
  AC: {
    L: {
      l: "Low",
      d: "<b>Worst:</b> Specialized access conditions or extenuating circumstances do not exist. An attacker can expect repeatable exploit success against a vulnerable target.",
    },
    H: {
      l: "High",
      d: "<b>Bad:</b> A successful attack depends on conditions outside the attacker's control. That is, a successful attack cannot be accomplished at-will, but requires the attacker to invest in some measurable amount of effort in preparation or execution against a specific target before successful attack can be expected. A successful attack depends on attackers overcoming one OR both of the following conditions: the attacker must gather target-specific reconnaissance; or the attacker must prepare the target environment to improve exploit reliability.",
    },
  },
  PR: {
    N: {
      l: "None",
      d: "<b>Worst:</b> The attacker is unprivileged or unauthenticated.",
    },
    L: {
      l: "Low",
      d: "<b>Worse</b> The attacker is authenticated with privileges that provide basic, low-impact capabilities. With these starting privileges an attacker is able to cause a Partial impact to one or more of: Confidentiality, Integrity, or Availability. Alternatively, an attacker with Low privileges may have the ability to cause an impact only to non-sensitive resources.",
    },
    H: {
      l: "High",
      d: "<b>Bad:</b> The attacker is authenticated with privileges that provide significant control over component resources. With these starting privileges an attacker can cause a Complete impact to one or more of: Confidentiality, Integrity, or Availability. Alternatively, an attacker with High privileges may have the ability to cause a Partial impact to sensitive resources.",
    },
  },
  UI: {
    N: {
      l: "None",
      d: "<b>Worst:</b> The vulnerable system can be exploited without any interaction from any user.",
    },
    R: {
      l: "Required",
      d: "<b>Bad:</b> Successful exploitation of this vulnerability requires a user to take one or more actions that may or may not be expected in a scenario involving no exploitation, or a scenario involving content provided by a seemingly trustworthy source.",
    },
  },

  S: {
    C: {
      l: "Changed",
      d: "<b>Worst:</b> The attacker attacks the vulnerable authorization scope and has an impact to its environment. This causes a direct impact to another scope. Score Impact relative to the Changed Scope.",
    },
    U: {
      l: "Unchanged",
      d: "<b>Bad:</b> The attacker attacks and impacts the environment that authorizes actions taken by the vulnerable authorization scope. Score Impact relative to the original authorization authority.",
    },
  },
  C: {
    H: {
      l: "High",
      d: "<b>Worst:</b> There is total information disclosure, resulting in all resources in the affected scope being divulged to the attacker. Alternatively, access to only some restricted information is obtained, but the disclosed information presents a direct, serious impact to the affected scope (e.g. the attacker can read the administrator's password, or private keys in memory are disclosed to the attacker).",
    },
    L: {
      l: "Low",
      d: "<b>Bad:</b> There is informational disclosure or a bypass of access controls. Access to some restricted information is obtained, but the attacker does not have control over what is obtained, or the scope of the loss is constrained. The information disclosure does not have a direct, serious impact on the affected scope.",
    },
    N: {
      l: "None",
      d: "<b>Good:</b> There is no impact to confidentiality within the affected scope.",
    },
  },
  I: {
    H: {
      l: "High",
      d: "<b>Worst:</b> There is a total compromise of system integrity. There is a complete loss of system protection, resulting in the entire system being compromised. The attacker is able to modify any files on the target system.",
    },
    L: {
      l: "Low",
      d: "<b>Bad:</b> Modification of data is possible, but the attacker does not have control over the end result of a modification, or the scope of modification is constrained. The data modification does not have a direct, serious impact on the affected scope.",
    },
    N: {
      l: "None",
      d: "<b>Good:</b> There is no impact to integrity within the affected scope.",
    },
  },
  A: {
    H: {
      l: "High",
      d: "<b>Worst:</b> There is total loss of availability, resulting in the attacker being able to fully deny access to resources in the affected scope; this loss is either sustained (while the attacker continues to deliver the attack) or persistent (the condition persists even after the attack has completed). Alternatively, the attacker has the ability to deny some availability, but the loss of availability presents a direct, serious impact to the affected scope (e.g. the attacker cannot disrupt existing connections, but can prevent new connections; the attacker can repeatedly exploit a vulnerability that, in each instance of a successful attack, leaks a only small amount of memory, but after repeated exploitation causes a service to become completely unavailable).",
    },
    L: {
      l: "Low",
      d: "<b>Bad:</b> There is reduced performance or interruptions in resource availability. The attacker does not have the ability to completely deny service to legitimate users, even through repeated exploitation of the vulnerability. The resources in the affected scope are either partially available all of the time, or fully available only some of the time, but the overall there is no direct, serious impact to the affected scope.",
    },
    N: {
      l: "None",
      d: "<b>Good:</b> There is no impact to availability within the affected scope.",
    },
  },
};


export const severityRatings: SeverityRatingType[] = [
  {
    name: "None",
    bottom: 0.0,
    top: 0.0,
  },
  {
    name: "Low",
    bottom: 0.1,
    top: 3.9,
  },
  {
    name: "Medium",
    bottom: 4.0,
    top: 6.9,
  },
  {
    name: "High",
    bottom: 7.0,
    top: 8.9,
  },
  {
    name: "Critical",
    bottom: 9.0,
    top: 10.0,
  },
];

export const severityRating = function (score:number) {
  var i;
  var severityRatingLength = severityRatings.length;
  for (i = 0; i < severityRatingLength; i++) {
    if (
      score >= severityRatings[i].bottom &&
      score <= severityRatings[i].top
    ) {
      return severityRatings[i];
    }
  }
  return {
    name: "?",
    bottom: "Not",
    top: "defined",
  };
};