<?php
//require_once __DIR__ . "/MedicalService.php";
//require_once __DIR__ . "/MedicalStaff.php";
require_once __DIR__ . "/Visit.php";
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\TransactionRequiredException;

/**
 * @ORM\Entity
 */
class Room
{
    protected EntityManager $entityManager;

    /**
     * @param EntityManager $entityManager
     */
    public function setEntityManager(EntityManager $entityManager): void
    {
        $this->entityManager = $entityManager;
    }
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     */
    private $number;

    /**
     * @ORM\Id
     * @ORM\Column(length=50)
     */
    private $type;

    /**
     * @ORM\ManyToOne(targetEntity="MedicalService", inversedBy="locations")
     */
    private $medicalService;

    /**
     * @ORM\OneToMany(targetEntity="MedicalStaff", mappedBy="assignedRoom")
     */
    private $assignedStaffs;


    /**
     * @ORM\Column(type="integer")
     */
    private $noOfStaffs;

    public function __construct()
    {
        $this->assignStaffs = new ArrayCollection();
    }

    /**
     * Get the value of number
     */
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * Set the value of number
     *
     * @return  self
     */
    public function setNumber($number)
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Get the value of assignedStaffs
     */
    public function getAssignedStaffs()
    {
        return $this->assignedStaffs;
    }

    /**
     * Set the value of assignedStaffs
     *
     * @param array $assignedStaffIDs
     * @return  self
     * @throws ORMException
     * @throws OptimisticLockException
     * @throws TransactionRequiredException
     */
    public function setAssignedStaffs(array $assignedStaffIDs)
    {
        foreach ($assignedStaffIDs as $assignedStaffID) {
            $staffObj = $this->entityManager->find('MedicalStaff', $assignedStaffID);
            $this->assignedStaffs[] = $staffObj;
        }
        $this->noOfStaffs = count($this->assignedStaffs);

        return $this;
    }

    /**
     * Get the value of medicalService
     */
    public function getMedicalService()
    {
        return $this->medicalService;
    }

    /**
     * Set the value of medicalService
     *
     * @param int $medicalService
     * @return  self
     */
    public function setMedicalService(int $medicalService)
    {
        $medicalServiceObj = $this->entityManager->find('MedicalService', $medicalService);
        $this->medicalService = $medicalServiceObj;

        return $this;
    }

    /**
     * Get the value of noOfStaffs
     */
    public function getNoOfStaffs()
    {
        return $this->noOfStaffs;
    }

    /**
     * Set the value of noOfStaffs
     *
     * @return  self
     */
    public function setNoOfStaffs($noOfStaffs)
    {
        $this->noOfStaffs = $noOfStaffs;

        return $this;
    }

    /**
     * Get the value of type
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set the value of type
     *
     * @return  self
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    public function get() {
        return [
            "number" => $this->getNumber(),
            "type" => $this->getType(),
            "medicalService" => $this->getMedicalService()->getName(),
            "noOfStaffs" => $this->getNoOfStaffs()
        ];
    }

    public static function validate(array $fields): bool
    {
        if (count($fields) === 4
            && array_key_exists("number", $fields)
            && array_key_exists("type", $fields)
            && array_key_exists("medicalService", $fields)
            && array_key_exists("assignedStaffs", $fields)
            && $fields["number"] !== ""
            && $fields["type"] !== ""
            && $fields["medicalService"] !== ""
        ) {
            return true;
        }
        return false;
    }
}
